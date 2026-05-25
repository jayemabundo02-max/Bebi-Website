import { useMemo } from "react";
import { getDaysUntilNextMonthsary } from "../utils/generateMonthsary";
import {
  getRelationshipYearCount,
  isAnniversaryDay,
  isMonthsaryDay
} from "../utils/anniversaryChecker";

export const useAnniversary = () => {
  const today = useMemo(() => new Date(), []);

  return {
    daysUntilMonthsary: getDaysUntilNextMonthsary(today),
    isAnniversary: isAnniversaryDay(today),
    isMonthsary: isMonthsaryDay(today),
    relationshipYears: getRelationshipYearCount(today)
  };
};
