import { TimeUnit } from "./constants";

export const percentageOfTimeUnit = (timeUnit: TimeUnit) => {
    const now = new Date();
    let startOfTimeUnit;
    let millisecondsSinceStartOfTimeUnit;
    let totalMillisecondsInATimeUnit;
  
    switch (timeUnit) {
      case TimeUnit.Day:
        startOfTimeUnit = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        millisecondsSinceStartOfTimeUnit = now.getTime() - startOfTimeUnit.getTime();
        totalMillisecondsInATimeUnit = 24 * 60 * 60 * 1000;
        break;
      case TimeUnit.Week:
        let currentDayOfWeek = now.getDay();
        let daysSinceMonday = (currentDayOfWeek === 0) ? -6 : (1 - currentDayOfWeek);
        startOfTimeUnit = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysSinceMonday);
        millisecondsSinceStartOfTimeUnit = now.getTime() - startOfTimeUnit.getTime();
        totalMillisecondsInATimeUnit = 7 * 24 * 60 * 60 * 1000;
        break;
      case TimeUnit.Month:
        startOfTimeUnit = new Date(now.getFullYear(), now.getMonth(), 1);
        millisecondsSinceStartOfTimeUnit = now.getTime() - startOfTimeUnit.getTime();
        totalMillisecondsInATimeUnit = new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime() - startOfTimeUnit.getTime();
        break;
      default:
        throw new Error(`Invalid time unit: ${timeUnit}`);
    }
  
    return Math.round(millisecondsSinceStartOfTimeUnit / totalMillisecondsInATimeUnit * 100);
}
