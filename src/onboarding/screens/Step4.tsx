import StepImage from '../../../assets/step-4.svg';
import StepScreen from '../components/StepScreen';

export default function Step4() {
  return (
    <StepScreen
      stepNumber={4}
      stepTitle="Sé parte de nuestras comunidades, eventos y gana créditos"
      stepImage={<StepImage />}
      nextStep="PasswordUpdate"
      continueButtonText='Empezar'
    />
  );
}