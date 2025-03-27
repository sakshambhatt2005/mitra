
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

interface CropInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CropInput: React.FC<CropInputProps> = ({ value, onChange }) => {
  const { translate } = useLanguage();

  const crops = [
    { id: 'rice', name: translate('rice') },
    { id: 'wheat', name: translate('wheat') },
    { id: 'cotton', name: translate('cotton') },
    { id: 'pulses', name: translate('pulses') },
    { id: 'vegetables', name: translate('vegetables') },
    { id: 'fruits', name: translate('fruits') },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="crop-select">{translate('selectCrop')}</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full" id="crop-select">
          <SelectValue placeholder={translate('selectCrop')} />
        </SelectTrigger>
        <SelectContent>
          {crops.map((crop) => (
            <SelectItem key={crop.id} value={crop.id}>
              {crop.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CropInput;
