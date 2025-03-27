
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeasonInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SeasonInput: React.FC<SeasonInputProps> = ({ value, onChange }) => {
  const { translate } = useLanguage();

  const seasons = [
    { id: 'kharif', name: translate('kharif') }, // June-October (Monsoon crop)
    { id: 'rabi', name: translate('rabi') },    // October-March (Winter crop)
    { id: 'zaid', name: translate('zaid') },    // March-June (Summer crop)
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="season-select">{translate('selectSeason')}</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full" id="season-select">
          <SelectValue placeholder={translate('selectSeason')} />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season) => (
            <SelectItem key={season.id} value={season.id}>
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeasonInput;
