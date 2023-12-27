export class Product {
  constructor(
    public itemCode: string,
    public productName: string,
    public productPackage: string,
    public availableUnits: number,
    public category: string,
    public lastUpdated: string
  ) {}

  updateAvailableUnits(value: number): void {
    this.availableUnits = value
  }

  updateLastUpdated(isoDate: string): void {
    this.lastUpdated = isoDate
  }
}
