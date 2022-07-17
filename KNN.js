class KNN {
  // [xPos, yPos, color]
  constructor(dataset) {
    this.dataset = dataset;
  }
  get() {
    return this.dataset;
  }
  predict(xPos, yPos, k = 200) {
    const dist = (row) =>
      Math.abs(Math.abs(row[0] - xPos) + Math.abs(row[1] - yPos));
    const sorted = _.chain(this.dataset)
      .map((row) => [dist(row), row[2]])
      .sortBy((row) => row[0])
      .slice(0, k)
      .countBy((row) => row[1])
      .toPairs()
      .sortBy((row) => -row[1]);

    return sorted.value()[0][0];
  }
}
