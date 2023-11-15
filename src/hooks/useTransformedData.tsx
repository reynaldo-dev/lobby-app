import { useEffect, useState } from 'react';
import LabelComponent from '../recognitions/components/LabelComponent';
import { useFindByRecognitionsCategoryQuery } from "../redux/services/recognitions.service";
import { RootState, useAppSelector } from "../redux/store/store";
import { theme } from '../theme';
import { Text } from 'native-base';

interface TransformedDataItem {
  value: number;
  labelComponent?: () => JSX.Element;
  topLabelComponent?: () => JSX.Element;
  frontColor: string;
}

const useTransformedData = () => {
  const [transformedData, setTransformedData] = useState<TransformedDataItem[]>([]);
  const [noOfSections, setNoOfSections] = useState(10);
  const [maxValue, setMaxValue] = useState(0);
  const { user } = useAppSelector((state: RootState) => state.user);

  const { data: recognitionHistory } = useFindByRecognitionsCategoryQuery({ id: user?.id as string });

  useEffect(() => {
    if (recognitionHistory) {
      const maxTotal = Math.max(...recognitionHistory.map(item => item.total), 10);
      const adjustedMaxValue = maxTotal < 10 ? 10 : (maxTotal % 10 === 0 ? maxTotal : maxTotal + (10 - (maxTotal % 10)));
      setMaxValue(adjustedMaxValue);
      const calculatedNoOfSections = Math.max(adjustedMaxValue, 10);
      setNoOfSections(calculatedNoOfSections);
      const newData = recognitionHistory.map(item => ({
        value: item.total,
        labelComponent: () => <LabelComponent value={item.category.name} />,
        topLabelComponent: () => <Text
          fontSize={{
            base: 'sm',
            sm: 'md',
            md: 'xl',
            lg: 'xl',
          }}
        >{item.total}</Text>,
        frontColor: theme.colors.primary as string,
      }));
      setTransformedData(newData);
    }
  }, [recognitionHistory]);

  return { transformedData, noOfSections, maxValue };
}

export default useTransformedData;
