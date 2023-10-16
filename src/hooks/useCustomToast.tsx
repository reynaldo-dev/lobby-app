import { Box, IBoxProps, Text, useTheme, useToast } from 'native-base';

interface ToastOptions {
  id: string;
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

function useCustomToast() {
  const theme = useTheme();
  const toast = useToast();

  const showToast = (options: ToastOptions) => {
    toast.show({
      id: options.id,
      render: () => {
        return (
          <Box
            py={1}
            px={3}
            rounded="sm"
            bg={options.backgroundColor || theme.colors.warning[400]}
            {...(options as IBoxProps)}
          >
            <Text color={options.textColor || theme.colors.white}>{options.title}</Text>
          </Box>
        );
      },
      duration: 2000,
      placement: 'top',
    });
  };

  return showToast;
}

export default useCustomToast;
