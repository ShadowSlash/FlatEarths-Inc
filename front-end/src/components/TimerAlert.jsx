import React from 'react'
import {
  Alert
} from "@material-tailwind/react";
import DatePickerControl from '../components/DatePickerControl';

export const TimerAlert = ({message}) => {

    let di
    // create  new timeout
    const timeout = setTimeout(() => {
        console.log('TimerAlert timeout');
    }, 2000);

  return (
    <Alert>A simple alert for showing message.</Alert>
  )
}
