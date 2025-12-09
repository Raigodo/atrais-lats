"use client";

import { createFavoriteAction } from "@/src/lib/actions/create-favorite-action";
import InputNumber from "../inputs/input-number";
import {
    CompactForm,
    CompactFormField,
    CompactFormInfoField,
    CompactFormRow,
    CompactFormSection,
} from "../layout/compact-form-layout";
import { useActionState, useEffect, useState } from "react";

interface CreateFavoriteCoinFormProps {
    symbol: string;
    name: string;
    price: number;
    onSubmitted?: () => void;
}

function CreateFavoriteCoinForm({ name, price, symbol, onSubmitted }: CreateFavoriteCoinFormProps) {
    const processedPrice = Number(price.toFixed(4));
    const [formState, setFormState] = useState({
        min: Number((processedPrice * 0.9).toFixed(4)),
        max: Number((processedPrice * 1.1).toFixed(4)),
    });

    const [state, formAction, isPending] = useActionState(createFavoriteAction, {
        success: false,
        errors: {},
    });

    useEffect(() => {
        if (state.success === true) onSubmitted?.();
    }, [state]);

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
                        <InputNumber
                            name="min"
                            value={formState.min}
                            message={state.errors.min}
                            onChange={(value) => setFormState({ ...formState, min: value })}
                        />
                    </CompactFormField>
                    <CompactFormField label="Max Price">
                        <InputNumber
                            name="max"
                            value={formState.max}
                            message={state.errors.max}
                            onChange={(value) => setFormState({ ...formState, max: value })}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default CreateFavoriteCoinForm;
