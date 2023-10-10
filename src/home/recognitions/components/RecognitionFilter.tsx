import { Select, VStack } from 'native-base';

interface RecognitionFilterProps {
    currentFilter: 'all' | 'received' | 'given';
    onChange: (type: 'all' | 'received' | 'given') => void;
}

const RecognitionFilter = ({ currentFilter, onChange }: RecognitionFilterProps) => {
    return (
        <VStack alignItems="center" space={4}>
            <Select
                selectedValue={currentFilter}
                w="95%"
                accessibilityLabel="Filtrar reconocimientos"
                placeholder="Filtrar reconocimientos"
                onValueChange={(value) => {
                    onChange(value as 'all' | 'received' | 'given');
                }}
            >
                <Select.Item label="Todos" value="all" />
                <Select.Item label="Recibidos" value="received" />
                <Select.Item label="Enviados" value="given" />
            </Select>
        </VStack>
    );
}

export default RecognitionFilter;
