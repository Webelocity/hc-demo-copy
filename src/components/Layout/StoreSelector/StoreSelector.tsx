'use client';

import { useAtom } from 'jotai';
import { selectedStoreAtom } from '@/atoms/storeAtom';
import { getAllStores, getStoreStatus, StoreId } from '@/util/shedule';
import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';
import { Radio } from '@mui/material';
import { useState, useEffect } from 'react';

interface StoreSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function StoreSelector({ isOpen, onClose }: StoreSelectorProps) {
    const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);
    const [tempSelection, setTempSelection] = useState<StoreId>(selectedStore);
    const stores = getAllStores();

    // Update temp selection when modal opens or selected store changes
    useEffect(() => {
        if (isOpen) {
            setTempSelection(selectedStore);
        }
    }, [isOpen, selectedStore]);

    const handleUpdate = () => {
        setSelectedStore(tempSelection);
        onClose();
    };

    const handleCancel = () => {
        setTempSelection(selectedStore); // Reset to current selection
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={handleCancel} title="Select Your Store" maxWidth="xs" >
            <div className="flex flex-col gap-[1.5rem]">
                <div className="flex flex-col gap-[1rem]">
                    {stores.map((store) => {
                        const status = getStoreStatus(store.id);
                        const isSelected = tempSelection === store.id;

                        return (
                            <label
                                key={store.id}
                                className={`block py-[0.675rem] px-[0.55rem] border border-[color:var(--Colors-Neutral-100)] rounded-[var(--Radius-xs)] cursor-pointer transition-all`}
                            >
                                <div className="flex items-start gap-[0.25rem]">
                                    <Radio
                                        name="store"
                                        value={store.id}
                                        checked={isSelected}
                                        size='small'
                                        onChange={() => setTempSelection(store.id)}
                                        sx={{
                                            color: 'var(--Colors-Neutral-100)',
                                            '&.Mui-checked': {
                                                color: 'var(--secondary-500-main)',
                                            },
                                        }}
                                    />
                                    <div className="flex-1 ">
                                        <h3 className="text-[1rem] font-semibold text-[var(--Colors-Neutral-900)]">
                                            {store.name}
                                        </h3>

                                        <div className="text-[0.75rem] flex flex-col gap-[0.25rem]">
                                            <p className='text-[var(--Colors-Neutral-500)]'>{store.fullAddress}</p>
                                            <div className="flex items-center gap-[0.25rem]">
                                                <a
                                                    href={`tel:${store.phone}`}
                                                    className="font-medium text-[var(--secondary-500-main)]"
                                                >
                                                    {store.phone}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-[0.2rem] font-medium">
                                                {status.isClosed24Hours ? (
                                                    <span className="text-red-600">Closed Today</span>
                                                ) : status.isOpen ? (
                                                    <>
                                                        <span className="text-[var(--Colorsuccess)]">Open</span>
                                                        <span className="text-[var(--Colors-Neutral-500)]">untill {status.closingTime}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-red-600">Closed</span>
                                                        {status.openingTime && (
                                                            <>
                                                                <span className="text-[var(--Colors-Neutral-500)]">Opens {status.openingTime}</span>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
                <p className='text-[0.75rem] font-medium'>
                    Note: Changing store locations may alter pricing and result in multiple pickup locations. Please review your cart before checking out.
                </p>
                <div className="flex gap-[1rem]">
                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                        fullWidth
                    >
                        Update
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCancel}
                        fullWidth
                    >
                        Cancel
                    </Button>

                </div>
            </div>



        </Modal>
    );
}

