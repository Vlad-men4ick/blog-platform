/* eslint-disable import/prefer-default-export */
import { getYear, parseISO, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const getDatePost = (post) => {
  const date = parseISO(post.createdAt);
  let month = format(date, 'LLLL', { locale: enGB });
  month = month.charAt(0).toUpperCase() + month.slice(1);
  const day = format(date, 'd', { locale: enGB });
  const year = getYear(date);
  return `${month} ${day}, ${year}`;
};
