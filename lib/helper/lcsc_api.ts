import { abs, bignumber, unit } from "mathjs";
import { PartState } from "./part_state";

export function extractPartInfoFromLCSCResponse(lcsc_response: any): PartState {
    const result = lcsc_response.result;
  
    const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-').replace(/\//g, '_')}_${result.title.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-').replace(/\//g, '_')}_${result.productCode}.html`;
    let paramVOList = [];
    if(result.paramVOList) {
      paramVOList = result.paramVOList.reduce((acc: any, curr: any) => {
        let value = curr.paramValueEnForSearch;
        if(curr.paramNameEn == "Tolerance"){
          value = curr.paramValueEn
        }
        acc[curr.paramNameEn] = value;
        return acc;
      }, {});
    }
    console.log(paramVOList);
  
    return {
      id: result.productId.toString(),
      title: result.title,
      quantity: result.stockNumber,
      productId: result.productId,
      productCode: result.productCode,
      productModel: result.productModel,
      productDescription: result.productIntroEn,
      parentCatalogName: result.parentCatalogName,
      catalogName: result.catalogName,
      brandName: result.brandNameEn,
      encapStandard: result.encapStandard,
      productImages: result.productImages,
      pdfLink: result.pdfUrl,
      productLink: productLink,
      prices: result.productPriceList.map((price: any) => ({
        ladder: price.ladder.toString(),
        price: parseFloat(price.productPrice),
      })),
      voltage: paramVOList["Voltage Rated"] ?? undefined,
      resistance: paramVOList["Resistance"] ?? undefined,
      power: paramVOList["Power(Watts)"] ?? undefined,
      current: paramVOList["Rated Current"] ?? undefined,
      tolerance: paramVOList["Tolerance"] ?? undefined,
      frequency: paramVOList["Frequency"] ?? undefined,
      capacitance: paramVOList["Capacitance"] ?? undefined, //in pF (pico Farad)
      inductance: paramVOList["Inductance"] ?? undefined,  //in uH (micro Henry)
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }