"use client"
import { getLocal } from '../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../components/molecules/molecules_field'
import { fetchYear } from '@/modules/repositories/stats_repository'

export default function StatsSectionFilterMonthlyChart(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const tokenKey = getLocal("token_key")
    const now = new Date()

    // Dictionaries for select options
    const [yearDictionary, setYearDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetchYear(
            now,
            (result) => {
                setIsLoaded(true)
                const year = result.map(el => el.year.toString())
                setYearDictionary(year)
            },
            (error) => {
                setError(error)
            },
            tokenKey
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return <MoleculesField title="Monthly Stats" type="select" defaultValue={props.selectedYear} items={yearDictionary} handleChange={props.handleChange}/>
    }
}
  