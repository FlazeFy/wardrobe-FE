"use client"
import MoleculesField from "../../../../components/molecules/molecules_field";
import { faFloppyDisk, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"

export default function GeneratedSectionConfigurateTemplate(props) {
    return (
        <>
            <a className="btn btn-primary" data-bs-target="#configureTemplateModal" data-bs-toggle="modal"><FontAwesomeIcon icon={faGear}/> Configurate</a>
            <div className="modal fade" id="configureTemplateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Set Your Template</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-start">
                            {
                                Object.entries(
                                    props.items.reduce((acc, item) => {
                                        acc[item.clothes_category] = acc[item.clothes_category] || []
                                        acc[item.clothes_category].push(item)
                                        return acc
                                    }, {})
                                ).map(([category, items]) => (
                                    <div key={category} className="mb-1">
                                        <h4 className="mb-2">{category}</h4>
                                        <div className="d-flex justify-content-start">
                                            {
                                                items.map((dt, index) => (
                                                    <div key={index} className="d-inline-block me-2">
                                                        <MoleculesField title={dt.clothes_type} type="toggle" defaultValue={dt.selected} handleChange={(e) => props.handleChange(dt.clothes_type, e)}/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }   
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
