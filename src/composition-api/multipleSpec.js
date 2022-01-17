export const multipleSpec = () => {
   let processProduct = (arr, endIndex) => {
      let sliceData = arr.slice(0, endIndex);
      if (sliceData.length === 0) return [];
      return sliceData.reduce((prev, current) => {
         let specs = current.specs;
         if (specs.length === 0) return prev;
         specs.sort((a, b) => a.price.iSpecPromoPrice - b.price.iSpecPromoPrice);
         prev.push({ ...current, specs,})
         return prev;
      }, []);
   }

   return { processProduct }
}