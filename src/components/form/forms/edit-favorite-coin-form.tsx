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
import { useActionState } from "react";

interface EditFavoriteCoinFormProps {
    name: string;
    price: number;
    symbol: string;
    min: number;
    max: number;
}

function EditFavoriteCoinForm({ name, price, symbol, min, max }: EditFavoriteCoinFormProps) {
    const [state, formAction, isPending] = useActionState(editFavoriteAction, {
        success: false,
        errors: {},
    });

    const processedPrice = Number(price.toFixed(4));

    return (
        <CompactForm action={formAction}>
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
                        <InputNumber name="min" defaultValue={min} />
                    </CompactFormField>
                    <CompactFormField label="Max Price">
                        <InputNumber name="max" defaultValue={max} />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default EditFavoriteCoinForm;
