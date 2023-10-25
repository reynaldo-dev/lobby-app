import StepImage from '../../../assets/step-2.svg';
import StepScreen from '../components/StepScreen';

export default function Step2() {
  return (
    <StepScreen
      stepNumber={2}
      stepTitle="Asigna puntos reconociendo a tus compañeros"
      stepImage={<StepImage />}
      nextStep="Step3"
    />
  );
}