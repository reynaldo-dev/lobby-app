import StepImage from '../../../assets/step-1.svg';
import StepScreen from '../components/StepScreen';

export default function Step1() {
  return (
    <StepScreen
      stepNumber={1}
      stepTitle="¡Gana puntos siendo reconocido!"
      stepImage={<StepImage />}
      nextStep="Step2"
      showBackButton={false}
    />
  );
}