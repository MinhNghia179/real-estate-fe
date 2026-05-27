import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export const formatDate = (date: Date | string): string => dayjs(date).format('DD/MM/YYYY');
export const formatTime = (date: Date | string): string => dayjs(date).format('HH:mm');
export const formatDateTime = (date: Date | string): string =>
  dayjs(date).format('DD/MM/YYYY HH:mm');
export const formatRelative = (date: Date | string): string => dayjs(date).fromNow();
