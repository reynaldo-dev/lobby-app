import StepImage from '../../../assets/step-3.svg';
import StepScreen from '../components/StepScreen';

export default function Step3() {
  return (
    <StepScreen
      stepNumber={3}
      stepTitle="Sé parte de nuestras comunidades, eventos y gana créditos"
      stepImage={<StepImage />}
      nextStep="Step4"
    />
  );
}