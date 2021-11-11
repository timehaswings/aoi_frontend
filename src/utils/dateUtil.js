import dayjs from "dayjs"

const DATE_REG = "YYYY-MM-DD";
const MONTH_REG = "YYYY-MM";
const ATTENDANCE_START = 26;
const ATTENDANCE_END = 25;

const lastDate = dayjs().subtract(1, "day");

/**
 * 获取当前考勤月
 * @returns [start, end] 返回开始和结束日期
 */
export function attendanceMonth() {
    let start, end;
    end = lastDate;
    if (lastDate.date() <= ATTENDANCE_END) {
        start = end.subtract(1, "month").date(ATTENDANCE_START);
    } else {
        start = end.date(ATTENDANCE_START);
    }
    return [start.format(DATE_REG), end.format(DATE_REG)];
}

/**
 * 获取自然年2021-01-01，当月
 * @returns [start, end] 返回开始和结束日期
 */
export function natureMonth() {
    return [`${dayjs().year()}-01`, lastDate.format(MONTH_REG)];
}

/**
 * 获取当前月1~30/31
 * @returns [start, end] 返回开始和结束日期
 */
export function attennowMonth() {
    let start, end;
    end = lastDate.endOf('month');
    start = lastDate.startOf('month');
    return [start.format(DATE_REG), end.format(DATE_REG)];
}

/**
 * 获取当前周1~7
 * @returns [start, end] 返回开始和结束日期
 */
export function attennowWeek() {
    let start, end;
    end = dayjs().day(7);
    start = dayjs().day(1);
    return [start.format(DATE_REG), end.format(DATE_REG)];
}

/**
 * 近六个考勤月
 * @returns [start, end] 返回开始和结束日期
 */
export function last6Month() {
    let start, end;
    if (lastDate.date() <= ATTENDANCE_END) {
        end = lastDate;
    } else {
        end = lastDate.add(1, "month");
    }
    start = end.subtract(6, "month");
    return [start.format(MONTH_REG), end.format(MONTH_REG)];
}

/**
 * 近十二个考勤月
 * @returns [start, end] 返回开始和结束日期
 */
export function last12Month() {
    let start, end;
    if (lastDate.date() <= ATTENDANCE_END) {
        end = lastDate;
    } else {
        end = lastDate.add(1, "month");
    }
    start = end.subtract(12, "month");
    return [start.format(MONTH_REG), end.format(MONTH_REG)];
}

/**
 * 获取两个日期相差天数
 * @param {*} date1 日期字符串：例如：2020-01-01
 * @param {*} date2 日期字符串：例如：2020-01-02
 * @returns 相差天数
 */
export function diffDay(date1, date2) {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'day'));
}

/**
 * 获取两个月份相差月份
 * @param {*} month1 日期字符串：例如：2020-01
 * @param {*} month2 日期字符串：例如：2020-02
 * @returns 相差月份
 */
export function diffMonth(month1, month2) {
    return Math.abs(dayjs(month1 + '-01').diff(dayjs(month2 + '-01'), 'month'));
}

/**
 * 获取两个日期相差年份
 * @param {*} date1 日期字符串：例如：2020-01-01
 * @param {*} date2 日期字符串：例如：2020-01-02 
 * @returns 相差年份
 */
export function diffYear(date1, date2) {
    return Math.abs(dayjs(date1).diff(dayjs(date2), 'year'));
}

/**
 * 获取昨天的日期
 * @returns 返回昨天的日期，例如：2020-01-01
 */
export function yesterday() {
    return lastDate.format(DATE_REG);
}

/**
 * 获取今天的日期
 * @returns 返回昨天的日期，例如：2020-01-01
 */
export function today() {
    return dayjs().format(DATE_REG);
}
/**
 * 获取当前日期往前推n天的日期
 * 获取昨天往前推n天的日期
 */
export function beforeYesterDay(days) {
    return lastDate.subtract(days, 'day').format(DATE_REG);
}

/**
 * 获取当前月
 * @returns 返回当前月，例如：2020-01
 */
export function currentMonth() {
    return lastDate.format(MONTH_REG);
}

/**
 * 获取n个月以前的日期，例如：2020-01-01
 *
 * @export
 * @returns
 */
export function prevMonthDate(off = 1) {
    return lastDate.subtract(off, "month").format(DATE_REG);
}

/**
 * 获取n个月以后的日期，例如：2020-01-01
 *
 * @export
 * @returns
 */
export function nextMonthDate(off = 1) {
    return lastDate.add(off, "month").format(DATE_REG);
}
