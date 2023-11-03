import { Select, VStack } from 'native-base';

interface RecognitionFilterProps {
    currentFilter: 'received' | 'given';
    onChange: (type: 'received' | 'given') => void;
}

const RecognitionFilter = ({ currentFilter, onChange }: RecognitionFilterProps) => {
    return (
        <VStack alignItems="center" space={4}>
            <Select
                fontSize={{
                    base: 'sm',
                    sm: 'sm',
                    md: 'lg',
                    lg: 'lg',
                }}
                selectedValue={currentFilter}
                w="95%"
                accessibilityLabel="Filtrar reconocimientos"
                placeholder="Filtrar reconocimientos"
                onValueChange={(value) => {
                    onChange(value as 'received' | 'given');
                }}
            >
                <Select.Item label="Recibidos" value="received" />
                <Select.Item label="Enviados" value="given" />
            </Select>
        </VStack>
    );
}

export default RecognitionFilter;
