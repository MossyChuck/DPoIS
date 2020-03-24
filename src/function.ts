export class TestFunction {
  f(x: number): number {
    const y = Math.cos(3 * x) + Math.sin(3 * x);
    return y;
  }

  getData(n: number): number[] {
    const data = new Array(n).fill(0);
    return data.map((_, i) => {
      const x = 2 * i * Math.PI / n;
      return this.f(x);
    });
  }

}