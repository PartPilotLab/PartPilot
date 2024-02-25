import { abs, bignumber, unit } from "mathjs";
import { PartState } from "./part_state";

export function extractPartInfoFromLCSCResponse(lcsc_response: any): PartState {
    const result = lcsc_response.result;
    // const productLink = `${result.catalogName}_${result.title.replace(/\(/g, '-').replace(/\)/g, '')}_${result.productCode}`;
    // const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/[\s-]/g, '_')}_${result.title.replace(/[\s-]/g, '_').replace(/\(/g, '-').replace(/\)/g, '')}_${result.productCode}.html`;
    // const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/\s/g, '-')}_${result.title.replace(/\s/g, '-').replace(/\(/g, '-').replace(/\)/g, '')}_${result.productCode}.html`;
    // const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_')}_${result.title.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_')}_${result.productCode}.html`;
    // const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-')}_${result.title.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-')}_${result.productCode}.html`;
    const productLink = `https://www.lcsc.com/product-detail/${result.catalogName.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-').replace(/\//g, '_')}_${result.title.replace(/\s/g, '-').replace(/-\(/g, '_').replace(/\)-/g, '_').replace(/-{2,}/g, '-').replace(/\//g, '_')}_${result.productCode}.html`;
    // const paramVOList = result.paramVOList.reduce((acc: any, curr: any) => {
    //   acc[curr.paramNameEn] = curr.paramValueEnForSearch;
    //   return acc;
    // }, {});
    const paramVOList = result.paramVOList.reduce((acc: any, curr: any) => {
        let value = curr.paramValueEnForSearch;
        if(curr.paramNameEn == "Tolerance"){
          value = curr.paramValueEn
        }
        acc[curr.paramNameEn] = value;
        return acc;
      }, {});
  
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
      voltage: paramVOList["Voltage Rated"],
      resistance: paramVOList["Resistance"],
      power: paramVOList["Power(Watts)"],
      current: paramVOList["Rated Current"],
      tolerance: paramVOList["Tolerance"],
      frequency: paramVOList["Frequency"],
      capacitance: paramVOList["Capacitance"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }