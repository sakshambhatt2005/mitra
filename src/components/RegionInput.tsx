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

interface RegionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const RegionInput: React.FC<RegionInputProps> = ({ value, onChange }) => {
  const { translate } = useLanguage();

  // List of state IDs
  const regions = [
    'andhra-pradesh',
    'assam',
    'bihar',
    'gujarat',
    'haryana',
    'karnataka',
    'kerala',
    'madhya-pradesh',
    'maharashtra',
    'odisha',
    'punjab',
    'rajasthan',
    'tamil-nadu',
    'telangana',
    'uttar-pradesh',
    'west-bengal',
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="region-select">{translate('selectRegion')}</Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          className="w-full" 
          id="region-select"
        >
          <SelectValue 
            placeholder={translate('selectRegion')}
            className="text-base"
          >
            {value ? translate(value) : translate('selectRegion')}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem 
              key={region} 
              value={region}
              className="text-base"
            >
              {translate(region)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegionInput;
