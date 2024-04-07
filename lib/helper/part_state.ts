export interface PartState {
    id: number;

    title?: string; //title

    quantity: number; //quantity

    productId?: number; //productId
    productCode: string; //productCode
    productModel?: string; //productModel
    productDescription?: string; //productIntroEn

    parentCatalogName?: string; //parentCatalogName
    catalogName?: string; //catalogName
    brandName?: string; //brandNameEn

    encapStandard?: string; //--> called Package

  
    productImages?: string[]; //productImages
    pdfLink?: string; //pdfUrl

    productLink?: string; //catalogName + _ + title (brackets to -) + _ + productCode
    // package: string;
    // manufacturer: string; //brandNameEn
  
    prices?: { ladder: string; price: number }[];

  
    voltage?: number; //param_10953_n --> paramNameEn: "Voltage Rated"
    resistance?: number; //param_10835_n --> paramNameEn: "Resistance"
    power?: number; //param_10837_n --> paramNameEn: "Power(Watts)"
    current?: number; //param_11284_n --> paramNameEn: "Rated Current"
    tolerance?: string; //param_10836_s --> paramNameEn: "Tolerance"
    frequency?: number; //param_11373_n --> paramNameEn: "Frequency"
    // type?: string;
    capacitance?: number; //param_10951_n --> paramNameEn: "Capacitance"
    inductance?: number; //--> paramNameEn: "Inductance"
    // tempretureCoefficient?: number;
    // minBuyQuantity?: number;

    createdAt: Date;
    updatedAt: Date;
  }