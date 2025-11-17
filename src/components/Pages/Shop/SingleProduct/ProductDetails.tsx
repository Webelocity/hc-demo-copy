'use client';

import * as React from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
interface ProductDetailsProps {
    product: Product;
}

type ProductTab = {
    key: string;
    label: string;
    content: React.ReactNode;
    isDisabled?: boolean;
};

const sanitizeForId = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

export default function ProductDetails({ product }: ProductDetailsProps) {
    const tabs = React.useMemo<ProductTab[]>(() => {
        const sections: ProductTab[] = [];
        console.log(product);
        if (product.description) {
            sections.push({
                key: 'description',
                label: 'Description',
                content: (
                    <section className="space-y-3">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {product.description}
                        </div>
                    </section>
                ),
            });
        }

        if (product.tables && product.tables.length > 0) {
            product.tables.forEach((table, idx) => {
                sections.push({
                    key: `table-${idx}`,
                    label: table.title || `Specifications ${idx + 1}`,
                    content: (
                        <section className="space-y-3">
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <tbody className="divide-y divide-gray-200">
                                        {table.values.map((item, itemIdx) => (
                                            <tr key={itemIdx} className="transition-colors hover:bg-gray-50">
                                                <td className="w-1/3 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                                                    {item.key}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{item.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ),
                });
            });
        }

        if (product.dimensionsTable) {
            sections.push({
                key: 'dimensions',
                label: product.dimensionsTable.title,
                content: (
                    <section className="space-y-3">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <tbody className="divide-y divide-gray-200">
                                    {product.dimensionsTable.values.map((item, idx) => (
                                        <tr key={idx} className="transition-colors hover:bg-gray-50">
                                            <td className="w-1/3 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                                                {item.key}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ),
            });
        }

        sections.push({
            key: 'reviews',
            label: 'Reviews',
            isDisabled: true,
            content: (
                <section className="space-y-3">
                </section>
            ),
        });

        return sections;
    }, [product]);

    const tabValues = React.useMemo(
        () => tabs.map((t, idx) => sanitizeForId(`${t.key}-${idx}`)),
        [tabs]
    );

    const [value, setValue] = React.useState<string>(tabValues[0] ?? '');

    React.useEffect(() => {
        if (!tabValues.includes(value)) {
            setValue(tabValues[0] ?? '');
        }
    }, [tabValues, value]);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const productDetailsTheme = React.useMemo(
        () =>
            createTheme({
                components: {
                    MuiTabs: {
                        styleOverrides: {
                            root: {
                                minHeight: 'auto',
                            },
                            flexContainer: {
                                gap: '0.5rem',
                            },
                            indicator: {
                                display: 'none',
                            },
                        },
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                minHeight: 'auto',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--Radius-md)',
                                color: 'var(--Colors-Neutral-800)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                '&:hover': {
                                    backgroundColor: 'var(--Colors-Secondary-50)',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'var(--Secondary-50)',
                                    color: 'var(--secondary-500-main)',
                                },
                            },
                        },
                    },
                },
            }),
        []
    );

    return (
        <div className="w-full space-y-6 py-6">
            <ThemeProvider theme={productDetailsTheme}>
                <TabContext value={value}>
                    <TabList
                        onChange={handleChange}
                        aria-label="Product details tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                        className="w-full flex overflow-x-auto"
                        TabIndicatorProps={{ className: 'hidden' }}  // hide indicator using Tailwind
                    >
                        {tabs.map((tab, index) => {
                            const tabValue = tabValues[index];
                            return (
                                <Tab
                                    key={tabValue}
                                    value={tabValue}
                                    label={tab.label}
                                    disabled={tab.isDisabled}
                                    className={[
                                        'shrink-0',
                                        'flex items-center justify-center',
                                        '!whitespace-nowrap'
                                    ].join(' ')}
                                />
                            );
                        })}
                    </TabList>

                    {tabs.map((tab, index) => (
                        <TabPanel key={tabValues[index]} value={tabValues[index]} className="space-y-6 p-0">
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabContext>
            </ThemeProvider>
        </div>
    );
}
