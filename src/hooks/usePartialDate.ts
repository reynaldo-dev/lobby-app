import { useEffect, useState } from 'react';

const months = [
     'Ene',
     'Feb',
     'Mar',
     'Abr',
     'May',
     'Jun',
     'Jul',
     'Ago',
     'Sep',
     'Oct',
     'Nov',
     'Dic',
];

export const usePartialDate = (dateTime: string) => {
     const [date, setDate] = useState(new Date(dateTime));
     const [month, setMonth] = useState('');
     const [day, setDay] = useState(0);
     const [year, setYear] = useState(0);

     useEffect(() => {
          setMonth(months[date.getMonth()]);
          setDay(date.getDate());
          setYear(date.getFullYear());
     }, []);

     return {
          month,
          day,
          year,
     };
};
