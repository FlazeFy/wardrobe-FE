"use client"
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box";
import { faCheck, faFire, faFloppyDisk, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useImperativeHandle, useState, forwardRef, useRef } from "react"
import Swal from "sweetalert2";
import { getLocal } from "../../../../modules/storages/local";

const GeneratedSectionSaveOutfit = forwardRef((props, ref) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useImperativeHandle(ref, () => ({
        fetchLocalHistory
    }));

    useEffect(() => {
        fetchLocalHistory();

        // Add event listener for the modal
        const modalElement = document.getElementById("saveOutfitModal");
        if (modalElement) {
            modalElement.addEventListener("shown.bs.modal", fetchLocalHistory);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (modalElement) {
                modalElement.removeEventListener("shown.bs.modal", fetchLocalHistory);
            }
        };
    }, []);

    const fetchLocalHistory = () => {
        try {
            Swal.showLoading();
            const localHistory = localStorage.getItem('generated_outfit_history');
            if (localHistory) {
                setItems(JSON.parse(localHistory));
            }
            setIsLoaded(true);
            Swal.close();
        } catch (error) {
            setError(error);
            Swal.close();
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <a className="btn btn-success ms-2" data-bs-target="#saveOutfitModal" data-bs-toggle="modal"> <FontAwesomeIcon icon={faFloppyDisk}/> Save Outfit</a>
                <div className="modal fade" id="saveOutfitModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Save Generated Outfit</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    items.map((dt, index) => (
                                        <div key={index} style={{ borderBottom: "1.5px solid #ccc" }} className="mb-2">
                                            <div className="text-start">
                                                <h5 className="mb-0 text-start">{dt.outfit_name}</h5>
                                                <p className="text-secondary">Generated at {dt.created_at}</p>
                                            </div>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Clothes Name</th>
                                                        <th>Type</th>
                                                        <th>Merk</th>
                                                        <th>Made From</th>
                                                        <th>Color</th>
                                                        <th>Last Used</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dt.data.map((clothes, i) => (
                                                            <tr key={i}>
                                                                <td>{clothes.clothes_name}</td>
                                                                <td>{clothes.clothes_type}</td>
                                                                <td>{clothes.clothes_merk}</td>
                                                                <td>{clothes.clothes_made_from}</td>
                                                                <td>{clothes.clothes_color}</td>
                                                                <td>{clothes.last_used ?? '-'}</td>
                                                                <td>
                                                                    <a className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/></a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="me-2">
                                    <a className="btn btn-primary"><FontAwesomeIcon icon={faCheck}/> Validate Existing</a>
                                </div>
                                <div>
                                    <a className="btn btn-danger me-2"><FontAwesomeIcon icon={faFire}/> Reset History</a>
                                    <a className="btn btn-success"><FontAwesomeIcon icon={faFloppyDisk}/> Save All</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
});

export default function GeneratedSectionRandomOutift() {
    const saveOutfitRef = useRef(null);

    const handleGenerate = () => {
        Swal.showLoading()
        setTimeout(() => {
            Swal.close();
            Swal.fire({
                title: "Generated!",
                icon: "success"
            }).then(() => {
                saveOutfitRef.current.fetchLocalHistory()
            })
        }, 1000)
    }

    return <GeneratedSectionSaveOutfit onClick={handleGenerate} ref={saveOutfitRef}/>
}