"use client";

import { editFavoriteAction } from "@/src/lib/actions/edit-favorite-action";
import InputNumber from "../inputs/input-number";
import {
    CompactForm,
    CompactFormField,
    CompactFormInfoField,
    CompactFormRow,
    CompactFormSection,
} from "../layout/compact-form-layout";
import { useActionState, useEffect, useState, useTransition } from "react";
import { deleteFavoriteAction } from "@/src/lib/actions/delete-favorite-action";
import SubmitButton from "../buttons/submit-button";

interface EditFavoriteCoinFormProps {
    name: string;
    price: number;
    symbol: string;
    min: number;
    max: number;
    onSubmitted?: () => void;
}

function EditFavoriteCoinForm({
    name,
    price,
    symbol,
    min,
    max,
    onSubmitted,
}: EditFavoriteCoinFormProps) {
    const [formState, setFormState] = useState({
        min,
        max,
    });

    const [editState, editAction] = useActionState(editFavoriteAction, {
        success: false,
        errors: {},
    });

    useEffect(() => {
        if (editState.success === true) onSubmitted?.();
    }, [editState]);

    const [deletePending, startDeleteTransition] = useTransition();

    const processedPrice = Number(price.toFixed(4));

    return (
        <CompactForm
            action={editAction}
            renderAdditionalButton={
                <SubmitButton
                    type="button"
                    pending={deletePending}
                    onClick={() =>
                        startDeleteTransition(
                            async () =>
                                await deleteFavoriteAction(symbol).then(() => onSubmitted?.())
                        )
                    }
                >
                    Delete
                </SubmitButton>
            }
        >
            <input type="hidden" name="symbol" value={symbol} />

            <CompactFormSection label="Cryptocurrency Info">
                <CompactFormRow>
                    <CompactFormInfoField label="Crypto Name" value={name} />
                    <CompactFormInfoField label="Current Price" value={processedPrice} />
                </CompactFormRow>
            </CompactFormSection>

            <CompactFormSection label="Set Price Alerts">
                <CompactFormRow>
                    <CompactFormField label="Min Price">
                        <InputNumber
                            name="min"
                            value={formState.min}
                            message={editState.errors.min}
                            onChange={(value) => setFormState({ ...formState, min: value })}
                        />
                    </CompactFormField>
                    <CompactFormField label="Max Price">
                        <InputNumber
                            name="max"
                            value={formState.max}
                            message={editState.errors.max}
                            onChange={(value) => setFormState({ ...formState, max: value })}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default EditFavoriteCoinForm;
