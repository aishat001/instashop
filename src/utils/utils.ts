export const calculateDiscountPercentage = (oldPrice: number | null, newPrice: null | number) => {
    if (!oldPrice || oldPrice === 0 || newPrice === 0 || !newPrice) return 0; 
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100); // Calculate percentage
  };

  export const getCombinations = (variations : any) => {
    if (!variations.length) return [];
    
    // Generate Cartesian Product of Variation Values
    const combinations = variations.reduce((acc: any[], variation: { values: any[]; }) => {
      const result: any[][] = [];
      acc.forEach((item: any) => {
        variation.values.forEach((value: any) => {
          result.push([...item, value]);
        });
      });
      return result;
    }, [[]]);
  
    return combinations;
  };