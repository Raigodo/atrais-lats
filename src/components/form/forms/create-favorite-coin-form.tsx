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
import { useActionState } from "react";

interface CreateFavoriteCoinFormProps {
    symbol: string;
    name: string;
    price: number;
}

function CreateFavoriteCoinForm({ name, price, symbol }: CreateFavoriteCoinFormProps) {
    const processedPrice = Number(price.toFixed(4));
    const [state, formAction, isPending] = useActionState(createFavoriteAction, {
        success: false,
        errors: {},
    });

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
                            defaultValue={Number((processedPrice * 0.9).toFixed(4))}
                        />
                    </CompactFormField>
                    <CompactFormField label="Max Price">
                        <InputNumber
                            name="max"
                            defaultValue={Number((processedPrice * 1.1).toFixed(4))}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default CreateFavoriteCoinForm;
