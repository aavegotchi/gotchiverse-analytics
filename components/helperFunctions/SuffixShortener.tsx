function SuffixShortener(data: number) {
  const suffix = Math.floor(Math.log10(data));
  let res: string = "";
  let number: number = data;
  if (suffix >= 15) {
    res = "P";

    return (number / (1 * 10 ** 15)).toString() + res;
  }
}

export default SuffixShortener;
