import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { getServerSession } from "next-auth";
import { getDeviceDetails } from "../../utils/package/serverSideApiCalls";
import axios from "axios";
import { RecordsPageProps } from "../../types/pageProps/pageProps";
import Link from 'next/link';
import { Log, VictoryAxis, VictoryChart, VictoryLine } from "victory";
import moment from "moment";
import { log } from "util";


function Index() {

    let [lineGraphArr, setLineGraphArr] = useState<
        { x: number; y: number | null }[]
    >([]);
    let finalValueArr: { x: number; y: number | null }[] = [];

    let tickValuesArr = useRef<number[]>([]);

    useEffect(() => {
        formulateGraphData()

    }, []);

    let mockData = [
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T03:09:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 72.17,
            "Timestamp": "2023-03-29T03:08:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.43,
            "HeartRate": 53.38,
            "Timestamp": "2023-03-29T03:08:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.66,
            "HeartRate": 50.51,
            "Timestamp": "2023-03-29T03:07:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T03:07:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.16,
            "HeartRate": 55.34,
            "Timestamp": "2023-03-29T03:06:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 54.55,
            "Timestamp": "2023-03-29T03:06:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T03:05:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 56.82,
            "Timestamp": "2023-03-29T03:05:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 55.76,
            "Timestamp": "2023-03-29T03:04:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 57.25,
            "Timestamp": "2023-03-29T03:04:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 55.76,
            "Timestamp": "2023-03-29T03:03:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 55.15,
            "Timestamp": "2023-03-29T03:03:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.83,
            "HeartRate": 51.63,
            "Timestamp": "2023-03-29T03:02:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T03:02:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T03:01:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 54.15,
            "Timestamp": "2023-03-29T03:01:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T03:00:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 55.35,
            "Timestamp": "2023-03-29T03:00:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 54.95,
            "Timestamp": "2023-03-29T02:59:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:59:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.96,
            "HeartRate": 53.95,
            "Timestamp": "2023-03-29T02:58:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.76,
            "Timestamp": "2023-03-29T02:58:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.1,
            "Timestamp": "2023-03-29T02:57:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 54.15,
            "Timestamp": "2023-03-29T02:57:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:56:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:56:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:55:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.76,
            "Timestamp": "2023-03-29T02:55:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": 53.56,
            "Timestamp": "2023-03-29T02:54:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:54:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T02:53:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:53:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 54.05,
            "Timestamp": "2023-03-29T02:52:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:52:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 53.76,
            "Timestamp": "2023-03-29T02:51:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 52.45,
            "Timestamp": "2023-03-29T02:51:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.89,
            "HeartRate": 54.54,
            "Timestamp": "2023-03-29T02:50:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.52,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:50:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.52,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T02:49:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.52,
            "HeartRate": 52.63,
            "Timestamp": "2023-03-29T02:49:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:48:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:48:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 53.48,
            "Timestamp": "2023-03-29T02:47:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:47:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 52.62,
            "Timestamp": "2023-03-29T02:46:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 54.05,
            "Timestamp": "2023-03-29T02:46:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T02:45:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 52.08,
            "Timestamp": "2023-03-29T02:45:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 53.38,
            "Timestamp": "2023-03-29T02:44:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 53.1,
            "Timestamp": "2023-03-29T02:44:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:43:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 51.64,
            "Timestamp": "2023-03-29T02:43:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.2,
            "HeartRate": 51.72,
            "Timestamp": "2023-03-29T02:42:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:42:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 51.9,
            "Timestamp": "2023-03-29T02:41:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:41:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T02:40:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T02:40:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:39:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:39:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.38,
            "HeartRate": 51.36,
            "Timestamp": "2023-03-29T02:38:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:38:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.64,
            "Timestamp": "2023-03-29T02:37:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 52.36,
            "Timestamp": "2023-03-29T02:37:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.55,
            "Timestamp": "2023-03-29T02:36:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 53,
            "Timestamp": "2023-03-29T02:36:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 52.08,
            "Timestamp": "2023-03-29T02:35:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:35:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 52.08,
            "Timestamp": "2023-03-29T02:34:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 52.08,
            "Timestamp": "2023-03-29T02:34:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 52.17,
            "Timestamp": "2023-03-29T02:33:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 51.81,
            "Timestamp": "2023-03-29T02:33:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 51.81,
            "Timestamp": "2023-03-29T02:32:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 52.45,
            "Timestamp": "2023-03-29T02:32:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 51.64,
            "Timestamp": "2023-03-29T02:31:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 51.55,
            "Timestamp": "2023-03-29T02:31:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.01,
            "HeartRate": 51.54,
            "Timestamp": "2023-03-29T02:30:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:30:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 52.08,
            "Timestamp": "2023-03-29T02:29:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.9,
            "Timestamp": "2023-03-29T02:29:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.19,
            "Timestamp": "2023-03-29T02:28:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:28:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.55,
            "Timestamp": "2023-03-29T02:27:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": 51.72,
            "Timestamp": "2023-03-29T02:27:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.4,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:26:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.53,
            "HeartRate": 52.26,
            "Timestamp": "2023-03-29T02:26:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.53,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T02:25:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.53,
            "HeartRate": 51.81,
            "Timestamp": "2023-03-29T02:25:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.53,
            "HeartRate": 50.51,
            "Timestamp": "2023-03-29T02:24:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.53,
            "HeartRate": 50.08,
            "Timestamp": "2023-03-29T02:24:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 53.38,
            "Timestamp": "2023-03-29T02:23:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:23:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:22:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.94,
            "HeartRate": 54.15,
            "Timestamp": "2023-03-29T02:22:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.66,
            "HeartRate": 57.16,
            "Timestamp": "2023-03-29T02:21:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.73,
            "HeartRate": 57.47,
            "Timestamp": "2023-03-29T02:21:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:20:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.64,
            "HeartRate": 52.91,
            "Timestamp": "2023-03-29T02:20:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T02:19:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.62,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:19:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 11.93,
            "HeartRate": 49.92,
            "Timestamp": "2023-03-29T02:18:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 51.81,
            "Timestamp": "2023-03-29T02:18:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 53.38,
            "Timestamp": "2023-03-29T02:17:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 53.96,
            "Timestamp": "2023-03-29T02:17:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T02:16:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:16:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 54.6,
            "Timestamp": "2023-03-29T02:15:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 56.18,
            "Timestamp": "2023-03-29T02:15:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 51.55,
            "Timestamp": "2023-03-29T02:14:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:14:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:13:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:13:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": 55.05,
            "Timestamp": "2023-03-29T02:12:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": 50.76,
            "Timestamp": "2023-03-29T02:12:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": 52.63,
            "Timestamp": "2023-03-29T02:11:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": 51.37,
            "Timestamp": "2023-03-29T02:11:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.91,
            "HeartRate": 53.76,
            "Timestamp": "2023-03-29T02:10:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": 56.29,
            "Timestamp": "2023-03-29T02:10:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": 53.19,
            "Timestamp": "2023-03-29T02:09:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:09:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": 54.84,
            "Timestamp": "2023-03-29T02:08:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": 56.29,
            "Timestamp": "2023-03-29T02:08:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": 55.56,
            "Timestamp": "2023-03-29T02:07:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:07:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.31,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:06:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.26,
            "HeartRate": 54.79,
            "Timestamp": "2023-03-29T02:06:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.6,
            "HeartRate": 52.26,
            "Timestamp": "2023-03-29T02:05:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-29T02:05:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.92,
            "HeartRate": 53.48,
            "Timestamp": "2023-03-29T02:04:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.75,
            "HeartRate": 52.82,
            "Timestamp": "2023-03-29T02:04:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.94,
            "HeartRate": 53.57,
            "Timestamp": "2023-03-29T02:03:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.24,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:03:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.4,
            "HeartRate": 55.33,
            "Timestamp": "2023-03-29T02:02:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.82,
            "HeartRate": 53.26,
            "Timestamp": "2023-03-29T02:02:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.56,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:01:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.15,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:01:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:00:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T02:00:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 57.92,
            "Timestamp": "2023-03-29T01:59:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 61.34,
            "Timestamp": "2023-03-29T01:59:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.15,
            "HeartRate": 54.55,
            "Timestamp": "2023-03-29T01:58:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:58:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:57:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:57:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 82.04,
            "Timestamp": "2023-03-29T01:56:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:56:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 57.92,
            "Timestamp": "2023-03-29T01:55:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T01:55:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:54:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 65.93,
            "Timestamp": "2023-03-29T01:54:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 64.1,
            "Timestamp": "2023-03-29T01:53:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-29T01:53:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 58.03,
            "Timestamp": "2023-03-29T01:52:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T01:52:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-29T01:51:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:51:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:50:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:50:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.71,
            "HeartRate": 57.03,
            "Timestamp": "2023-03-29T01:49:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.71,
            "HeartRate": 57.47,
            "Timestamp": "2023-03-29T01:49:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.71,
            "HeartRate": 63.56,
            "Timestamp": "2023-03-29T01:48:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.83,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T01:48:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:47:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 58.25,
            "Timestamp": "2023-03-29T01:47:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.89,
            "HeartRate": 57.91,
            "Timestamp": "2023-03-29T01:46:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T01:46:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-29T01:45:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 56.93,
            "Timestamp": "2023-03-29T01:45:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 58.25,
            "Timestamp": "2023-03-29T01:44:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 58.71,
            "Timestamp": "2023-03-29T01:44:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 57.92,
            "Timestamp": "2023-03-29T01:43:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:43:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.38,
            "HeartRate": 59.99,
            "Timestamp": "2023-03-29T01:42:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.69,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:42:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.69,
            "HeartRate": 56.71,
            "Timestamp": "2023-03-29T01:41:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.05,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:41:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.93,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:40:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.93,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-29T01:40:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.93,
            "HeartRate": 62.24,
            "Timestamp": "2023-03-29T01:39:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.93,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:39:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.93,
            "HeartRate": 62.75,
            "Timestamp": "2023-03-29T01:38:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 62.24,
            "Timestamp": "2023-03-29T01:38:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.1,
            "HeartRate": 62.06,
            "Timestamp": "2023-03-29T01:37:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T01:37:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 59.17,
            "Timestamp": "2023-03-29T01:36:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-29T01:36:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-29T01:35:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 58.03,
            "Timestamp": "2023-03-29T01:35:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.79,
            "HeartRate": 56.39,
            "Timestamp": "2023-03-29T01:34:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.48,
            "HeartRate": 55.15,
            "Timestamp": "2023-03-29T01:34:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:33:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.77,
            "HeartRate": 52.45,
            "Timestamp": "2023-03-29T01:33:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 51.02,
            "Timestamp": "2023-03-29T01:32:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 53.29,
            "Timestamp": "2023-03-29T01:32:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.62,
            "HeartRate": 55.66,
            "Timestamp": "2023-03-29T01:31:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.82,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:31:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:30:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:30:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 76.14,
            "Timestamp": "2023-03-29T01:29:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:29:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T01:28:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T01:28:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:27:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:27:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.61,
            "HeartRate": 59.05,
            "Timestamp": "2023-03-29T01:26:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 58.94,
            "Timestamp": "2023-03-29T01:26:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 59.06,
            "Timestamp": "2023-03-29T01:25:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:25:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T01:24:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 59.88,
            "Timestamp": "2023-03-29T01:24:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:23:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:23:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:22:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T01:22:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T01:21:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-29T01:21:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T01:20:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 59.06,
            "Timestamp": "2023-03-29T01:20:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 60,
            "Timestamp": "2023-03-29T01:19:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 59.41,
            "Timestamp": "2023-03-29T01:19:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.62,
            "HeartRate": 60.72,
            "Timestamp": "2023-03-29T01:18:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 99.34,
            "Timestamp": "2023-03-29T01:18:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 60,
            "Timestamp": "2023-03-29T01:17:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T01:17:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 49.34,
            "Timestamp": "2023-03-29T01:16:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 60.12,
            "Timestamp": "2023-03-29T01:16:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 60,
            "Timestamp": "2023-03-29T01:15:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 58.48,
            "Timestamp": "2023-03-29T01:15:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.68,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-29T01:14:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:14:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 59.41,
            "Timestamp": "2023-03-29T01:13:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 58.03,
            "Timestamp": "2023-03-29T01:13:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 57.03,
            "Timestamp": "2023-03-29T01:12:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T01:12:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T01:11:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.17,
            "HeartRate": 56.29,
            "Timestamp": "2023-03-29T01:11:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.3,
            "HeartRate": 59.51,
            "Timestamp": "2023-03-29T01:10:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 57.8,
            "Timestamp": "2023-03-29T01:10:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-29T01:09:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T01:09:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:08:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-29T01:08:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T01:07:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 58.48,
            "Timestamp": "2023-03-29T01:07:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:06:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 58.03,
            "Timestamp": "2023-03-29T01:06:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 57.47,
            "Timestamp": "2023-03-29T01:05:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T01:05:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 55.76,
            "Timestamp": "2023-03-29T01:04:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.46,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T01:04:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.46,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T01:03:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.46,
            "HeartRate": 59.65,
            "Timestamp": "2023-03-29T01:03:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.46,
            "HeartRate": 59.05,
            "Timestamp": "2023-03-29T01:02:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 59.17,
            "Timestamp": "2023-03-29T01:02:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T01:01:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 59.41,
            "Timestamp": "2023-03-29T01:01:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T01:00:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 59.06,
            "Timestamp": "2023-03-29T01:00:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T00:59:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 59.17,
            "Timestamp": "2023-03-29T00:59:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.36,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T00:58:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.94,
            "Timestamp": "2023-03-29T00:58:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:57:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T00:57:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:56:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T00:56:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T00:55:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.82,
            "Timestamp": "2023-03-29T00:55:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.54,
            "HeartRate": 58.13,
            "Timestamp": "2023-03-29T00:54:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 59.06,
            "Timestamp": "2023-03-29T00:54:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 58.25,
            "Timestamp": "2023-03-29T00:53:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T00:53:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 59.64,
            "Timestamp": "2023-03-29T00:52:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 57.8,
            "Timestamp": "2023-03-29T00:52:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:51:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 57.92,
            "Timestamp": "2023-03-29T00:51:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.4,
            "HeartRate": 57.24,
            "Timestamp": "2023-03-29T00:50:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.25,
            "HeartRate": 57.69,
            "Timestamp": "2023-03-29T00:50:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.25,
            "HeartRate": 58.03,
            "Timestamp": "2023-03-29T00:49:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.25,
            "HeartRate": 57.58,
            "Timestamp": "2023-03-29T00:49:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.25,
            "HeartRate": 56.71,
            "Timestamp": "2023-03-29T00:48:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:48:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:47:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.1,
            "HeartRate": 50.76,
            "Timestamp": "2023-03-29T00:47:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:46:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12,
            "HeartRate": 52.45,
            "Timestamp": "2023-03-29T00:46:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12,
            "HeartRate": 52.36,
            "Timestamp": "2023-03-29T00:45:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:45:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:44:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": 57.92,
            "Timestamp": "2023-03-29T00:44:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": 57.03,
            "Timestamp": "2023-03-29T00:43:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-29T00:43:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15,
            "HeartRate": 58.47,
            "Timestamp": "2023-03-29T00:42:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T00:42:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 57.69,
            "Timestamp": "2023-03-29T00:41:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 57.58,
            "Timestamp": "2023-03-29T00:41:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 57.47,
            "Timestamp": "2023-03-29T00:40:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:40:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.06,
            "HeartRate": 54.55,
            "Timestamp": "2023-03-29T00:39:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.25,
            "HeartRate": 51.9,
            "Timestamp": "2023-03-29T00:39:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:38:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 56.5,
            "Timestamp": "2023-03-29T00:38:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 55.15,
            "Timestamp": "2023-03-29T00:37:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 55.56,
            "Timestamp": "2023-03-29T00:37:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:36:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 56.82,
            "Timestamp": "2023-03-29T00:36:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 56.5,
            "Timestamp": "2023-03-29T00:35:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 56.18,
            "Timestamp": "2023-03-29T00:35:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.34,
            "HeartRate": 56.6,
            "Timestamp": "2023-03-29T00:34:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 56.82,
            "Timestamp": "2023-03-29T00:34:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 56.71,
            "Timestamp": "2023-03-29T00:33:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:33:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 57.25,
            "Timestamp": "2023-03-29T00:32:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 56.71,
            "Timestamp": "2023-03-29T00:32:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 55.35,
            "Timestamp": "2023-03-29T00:31:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 12.73,
            "HeartRate": 54.55,
            "Timestamp": "2023-03-29T00:31:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:30:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.31,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:30:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 82.19,
            "Timestamp": "2023-03-29T00:29:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.26,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:29:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.28,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:28:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.28,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:28:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 68.49,
            "Timestamp": "2023-03-29T00:27:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:27:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:26:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 96.15,
            "Timestamp": "2023-03-29T00:26:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:25:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.12,
            "HeartRate": 56.33,
            "Timestamp": "2023-03-29T00:25:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.12,
            "HeartRate": 86.96,
            "Timestamp": "2023-03-29T00:24:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 65.36,
            "Timestamp": "2023-03-29T00:24:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 64.38,
            "Timestamp": "2023-03-29T00:23:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 78.33,
            "Timestamp": "2023-03-29T00:23:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.36,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:22:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 63.56,
            "Timestamp": "2023-03-29T00:22:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:21:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:21:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 80.65,
            "Timestamp": "2023-03-29T00:20:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.74,
            "HeartRate": 65.22,
            "Timestamp": "2023-03-29T00:20:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.3,
            "HeartRate": 64.52,
            "Timestamp": "2023-03-29T00:19:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 64.66,
            "Timestamp": "2023-03-29T00:19:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 66.07,
            "Timestamp": "2023-03-29T00:18:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 65.36,
            "Timestamp": "2023-03-29T00:18:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 63.56,
            "Timestamp": "2023-03-29T00:17:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-29T00:17:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-29T00:16:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 65.22,
            "Timestamp": "2023-03-29T00:16:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 63.83,
            "Timestamp": "2023-03-29T00:15:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 64.79,
            "Timestamp": "2023-03-29T00:15:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:14:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 63.97,
            "Timestamp": "2023-03-29T00:14:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T00:13:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-29T00:13:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T00:12:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-29T00:12:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 64.1,
            "Timestamp": "2023-03-29T00:11:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": 63.36,
            "Timestamp": "2023-03-29T00:11:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.43,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:10:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-29T00:10:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 60,
            "Timestamp": "2023-03-29T00:09:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 59.33,
            "Timestamp": "2023-03-29T00:09:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T00:08:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 59.17,
            "Timestamp": "2023-03-29T00:08:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 58.59,
            "Timestamp": "2023-03-29T00:07:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.24,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-29T00:07:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-29T00:06:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-29T00:06:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 57.8,
            "Timestamp": "2023-03-29T00:05:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 61.86,
            "Timestamp": "2023-03-29T00:05:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T00:04:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-29T00:04:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-29T00:03:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-29T00:03:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.03,
            "HeartRate": 57.45,
            "Timestamp": "2023-03-29T00:02:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-29T00:02:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T00:01:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-29T00:01:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-29T00:00:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-29T00:00:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.92,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:59:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.3,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-28T23:59:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.75,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:58:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.76,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:58:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.76,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:57:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.76,
            "HeartRate": 58.14,
            "Timestamp": "2023-03-28T23:57:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:56:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.29,
            "HeartRate": 61.6,
            "Timestamp": "2023-03-28T23:56:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.29,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:55:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.29,
            "HeartRate": 60,
            "Timestamp": "2023-03-28T23:55:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.29,
            "HeartRate": 61.72,
            "Timestamp": "2023-03-28T23:54:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:54:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:53:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:53:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-28T23:52:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:52:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-28T23:51:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.5,
            "HeartRate": 59.41,
            "Timestamp": "2023-03-28T23:51:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:50:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-28T23:50:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": 103.81,
            "Timestamp": "2023-03-28T23:49:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 18.39,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-28T23:49:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.15,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:48:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.15,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:48:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.15,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:47:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.15,
            "HeartRate": 60,
            "Timestamp": "2023-03-28T23:47:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.15,
            "HeartRate": 60.23,
            "Timestamp": "2023-03-28T23:46:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:46:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:45:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:45:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 59.64,
            "Timestamp": "2023-03-28T23:44:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:44:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:43:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:43:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.65,
            "HeartRate": 61.47,
            "Timestamp": "2023-03-28T23:42:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:42:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-28T23:41:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:41:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:40:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:40:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-28T23:39:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:39:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.48,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:38:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:38:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 60,
            "Timestamp": "2023-03-28T23:37:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:37:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:36:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:36:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:35:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:35:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.49,
            "HeartRate": 60.47,
            "Timestamp": "2023-03-28T23:34:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:34:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:33:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:33:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-28T23:32:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:32:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:31:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:31:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.03,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:30:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:30:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:29:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:29:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:28:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-28T23:28:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:27:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 59.76,
            "Timestamp": "2023-03-28T23:27:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.81,
            "HeartRate": 59.28,
            "Timestamp": "2023-03-28T23:26:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:26:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:25:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:25:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 61.6,
            "Timestamp": "2023-03-28T23:24:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:24:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:23:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:23:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 17.01,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:22:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 61.56,
            "Timestamp": "2023-03-28T23:22:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 61.86,
            "Timestamp": "2023-03-28T23:21:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:21:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:20:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 61.1,
            "Timestamp": "2023-03-28T23:20:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:19:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:19:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.6,
            "HeartRate": 60.97,
            "Timestamp": "2023-03-28T23:18:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.97,
            "HeartRate": 61.6,
            "Timestamp": "2023-03-28T23:18:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.97,
            "HeartRate": 60.85,
            "Timestamp": "2023-03-28T23:17:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.97,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T23:17:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.97,
            "HeartRate": 59.29,
            "Timestamp": "2023-03-28T23:16:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.51,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T23:16:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.51,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:15:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.51,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T23:15:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.51,
            "HeartRate": 61.72,
            "Timestamp": "2023-03-28T23:14:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:14:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:13:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 62.24,
            "Timestamp": "2023-03-28T23:13:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:12:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T23:12:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:11:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:11:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.21,
            "HeartRate": 60.97,
            "Timestamp": "2023-03-28T23:10:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:10:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 62.5,
            "Timestamp": "2023-03-28T23:09:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T23:09:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T23:08:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:08:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 62.24,
            "Timestamp": "2023-03-28T23:07:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T23:07:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.79,
            "HeartRate": 63.55,
            "Timestamp": "2023-03-28T23:06:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.42,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:06:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.42,
            "HeartRate": 61.22,
            "Timestamp": "2023-03-28T23:05:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.42,
            "HeartRate": 59.41,
            "Timestamp": "2023-03-28T23:05:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.17,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:04:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.17,
            "HeartRate": 77.53,
            "Timestamp": "2023-03-28T23:04:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.17,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-28T23:03:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.17,
            "HeartRate": 60.24,
            "Timestamp": "2023-03-28T23:03:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T23:02:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 63.56,
            "Timestamp": "2023-03-28T23:02:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.6,
            "HeartRate": 58.37,
            "Timestamp": "2023-03-28T23:01:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.71,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T23:01:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 13.71,
            "HeartRate": 107.53,
            "Timestamp": "2023-03-28T23:00:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 66.23,
            "Timestamp": "2023-03-28T23:00:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 65.36,
            "Timestamp": "2023-03-28T22:59:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T22:59:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.14,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:58:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:54:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T22:53:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 64.38,
            "Timestamp": "2023-03-28T22:53:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-28T22:52:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 64.1,
            "Timestamp": "2023-03-28T22:52:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 63.42,
            "Timestamp": "2023-03-28T22:51:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 62.5,
            "Timestamp": "2023-03-28T22:51:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.99,
            "HeartRate": 61.72,
            "Timestamp": "2023-03-28T22:50:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T22:50:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 62.24,
            "Timestamp": "2023-03-28T22:49:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.23,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:49:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.47,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T22:48:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.47,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T22:48:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.47,
            "HeartRate": 60.73,
            "Timestamp": "2023-03-28T22:47:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.1,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T22:47:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.1,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T22:46:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T22:46:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 61.1,
            "Timestamp": "2023-03-28T22:45:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-28T22:45:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 59.64,
            "Timestamp": "2023-03-28T22:44:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T22:44:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 60,
            "Timestamp": "2023-03-28T22:43:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 61.48,
            "Timestamp": "2023-03-28T22:43:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 60.48,
            "Timestamp": "2023-03-28T22:42:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T22:42:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 61.73,
            "Timestamp": "2023-03-28T22:41:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 62.5,
            "Timestamp": "2023-03-28T22:41:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 60.98,
            "Timestamp": "2023-03-28T22:40:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 61.1,
            "Timestamp": "2023-03-28T22:40:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 62.5,
            "Timestamp": "2023-03-28T22:39:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 61.6,
            "Timestamp": "2023-03-28T22:39:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.4,
            "HeartRate": 62.49,
            "Timestamp": "2023-03-28T22:38:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.1,
            "HeartRate": 62.89,
            "Timestamp": "2023-03-28T22:38:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:37:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:37:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.98,
            "HeartRate": 63.83,
            "Timestamp": "2023-03-28T22:36:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.98,
            "HeartRate": 62.76,
            "Timestamp": "2023-03-28T22:36:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.98,
            "HeartRate": 64.38,
            "Timestamp": "2023-03-28T22:35:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.98,
            "HeartRate": 63.97,
            "Timestamp": "2023-03-28T22:35:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.98,
            "HeartRate": 62.75,
            "Timestamp": "2023-03-28T22:34:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 64.1,
            "Timestamp": "2023-03-28T22:34:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 63.56,
            "Timestamp": "2023-03-28T22:33:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 64.1,
            "Timestamp": "2023-03-28T22:33:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 64.66,
            "Timestamp": "2023-03-28T22:32:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 64.94,
            "Timestamp": "2023-03-28T22:32:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 63.83,
            "Timestamp": "2023-03-28T22:31:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 64.94,
            "Timestamp": "2023-03-28T22:31:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.76,
            "HeartRate": 63.03,
            "Timestamp": "2023-03-28T22:30:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.56,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-28T22:30:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 14.56,
            "HeartRate": 63.69,
            "Timestamp": "2023-03-28T22:29:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:29:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 66.96,
            "Timestamp": "2023-03-28T22:28:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 64.94,
            "Timestamp": "2023-03-28T22:28:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 61.98,
            "Timestamp": "2023-03-28T22:27:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.18,
            "HeartRate": 59.52,
            "Timestamp": "2023-03-28T22:27:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": -1,
            "HeartRate": -1,
            "Timestamp": "2023-03-28T22:26:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 67.26,
            "Timestamp": "2023-03-28T22:26:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 84.75,
            "Timestamp": "2023-03-28T22:25:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.82,
            "HeartRate": 65.08,
            "Timestamp": "2023-03-28T22:25:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.53,
            "HeartRate": 64.26,
            "Timestamp": "2023-03-28T22:24:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 66.23,
            "Timestamp": "2023-03-28T22:24:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 64.94,
            "Timestamp": "2023-03-28T22:23:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 66.67,
            "Timestamp": "2023-03-28T22:23:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 16.08,
            "HeartRate": 65.07,
            "Timestamp": "2023-03-28T22:22:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 65.5,
            "Timestamp": "2023-03-28T22:22:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.23,
            "HeartRate": 63.83,
            "Timestamp": "2023-03-28T22:21:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.34,
            "HeartRate": 63.83,
            "Timestamp": "2023-03-28T22:21:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 63.69,
            "Timestamp": "2023-03-28T22:20:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 67.11,
            "Timestamp": "2023-03-28T22:20:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 67.25,
            "Timestamp": "2023-03-28T22:19:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 66.37,
            "Timestamp": "2023-03-28T22:19:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.35,
            "HeartRate": 63.28,
            "Timestamp": "2023-03-28T22:18:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 63.29,
            "Timestamp": "2023-03-28T22:18:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 66.08,
            "Timestamp": "2023-03-28T22:17:30Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        },
        {
            "BreathRate": 15.72,
            "HeartRate": 65.5,
            "Timestamp": "2023-03-28T22:17:00Z",
            "UserId": "fe543aa9-4837-4562-9614-bc56390cf9b2"
        }
    ]
    const formulateGraphData = useCallback(() => {
        let mockData2 = mockData.slice().reverse()
        for (let i = 0; i < mockData2.length; i++) {

            let ts = moment(mockData2[i].Timestamp, "YYYY-MM-DDTHH:mm:ss.000ZZ").valueOf();
            let hrValue = mockData2[i].HeartRate
            if (hrValue <= 0) {
                hrValue = null
            }
            finalValueArr.push({
                x: ts / 1000,
                y: hrValue,
            });
        }
        // console.log('mockData '+ JSON.stringify(mockData));

        // var ts = moment("2023-03-24T05:01:00Z","YYYY-MM-DDTHH:mm:ss.000ZZ").valueOf();

        console.log('finalValueArr ==>' + JSON.stringify(finalValueArr));

        tickValuesArr.current = [1680041850, 1680059370]

        setLineGraphArr(finalValueArr);
    }, []);


    return (
        <>
            <Head>
                <title>Trends</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-[896px]">
                <VictoryChart>
                    {/* <VictoryAxis
            dependentAxis
            style={{
              axis: {stroke: 'transparent'},
            }}
          /> */}
                    <VictoryAxis
                        style={{
                            axis: { stroke: 'transparent' },
                            tickLabels: {
                                fill: 'black',
                                fontSize: (12),
                            },
                            ticks: { stroke: 'black', size: 2 },
                        }}
                        scale={{ x: 'time', y: 'linear' }}
                        // fixLabelOverlap={true}
                        tickFormat={t => moment.unix(t).format('h a')}
                        tickValues={tickValuesArr.current}
                    />
                    <VictoryLine
                        interpolation={'monotoneX'}
                        data={lineGraphArr}
                    />
                </VictoryChart>
            </main>
        </>
    );
}

export default Index;
//