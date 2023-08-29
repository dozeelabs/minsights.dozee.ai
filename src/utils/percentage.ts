export default function (value: number | null, Epochs: number | null) {
    if (!Epochs || !value) {
      return "--";
    }
    const per = Math.round((value / Epochs) * 100);
  
    return per;
  }
  