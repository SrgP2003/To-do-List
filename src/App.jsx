import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import Task from './components/TasksTools'
import Content from './components/Content';

export default function App(){
  return(
    <>
    <Content/>
    <Task/> 
    </>
  )
}