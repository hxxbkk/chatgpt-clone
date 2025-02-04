'use client';

import { useModelStore } from '@/store/model';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useEffect, useState } from 'react';

const MODELS = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4o'];

export function ModelSelect() {
  const [isMounted, setIsMounted] = useState(false);
  const currentModel = useModelStore((state) => state.model);
  const updateModel = useModelStore((state) => state.updateModel);

  const handleChange = (selectModel: string) => {
    updateModel(selectModel);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 서버와의 불일치 문제를 방지하기 위해 초기 렌더링 시 null 반환
  if (!isMounted) return null;

  return (
    <Select value={currentModel} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] border-none text-xl focus:ring-transparent">
        <SelectValue placeholder="모델 선택" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem
            key={model}
            value={model}
            disabled={currentModel === model}
          >
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
