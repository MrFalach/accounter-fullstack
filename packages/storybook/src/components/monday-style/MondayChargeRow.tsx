import { ReactElement } from 'react';
import { ChargeData } from '../../mocks/charges-data';
import { MondayChargeCard } from './MondayChargeCard';

interface MondayChargeRowProps {
  charge: ChargeData;
  isExpanded: boolean;
  onToggle: () => void;
}

export const MondayChargeRow = ({
  charge,
  isExpanded,
  onToggle,
}: MondayChargeRowProps): ReactElement => {
  return <MondayChargeCard charge={charge} isExpanded={isExpanded} onToggle={onToggle} />;
};
