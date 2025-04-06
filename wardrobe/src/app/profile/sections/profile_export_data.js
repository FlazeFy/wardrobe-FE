"use client"
import React from 'react'
import OrganismsExportBox from '../../../components/organisms/organisms_export_box'

export default function ProfileSectionExportData() {
    return (
        <> 
            <h2 className="fw-bold">Export My Data</h2>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                    <OrganismsExportBox title="Clothes Data" desc="All clothes data are separated into 2 section. The active clothes and the deleted clothes" ctx="clothes" type="excel"/>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                    <OrganismsExportBox title="Clothes Used History Data" desc="This also show history of deleted clothes" ctx="clothes_used" type="excel"/>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                    <OrganismsExportBox title="Wash History Data" desc="This also show history of deleted clothes" ctx="wash" type="excel"/>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                    <OrganismsExportBox title="Apps History Data" desc="All your activity within this apps" ctx="history" type="excel"/>
                </div>
            </div>
        </>
    )
}
  