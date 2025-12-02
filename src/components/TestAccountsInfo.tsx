import { Info } from 'lucide-react';

/**
 * Test Accounts Info Component
 * Displays available test accounts for easy login
 */
export const TestAccountsInfo = () => {
    const accounts = [
        { role: 'User', email: 'user@example.com', password: 'password123' },
        { role: 'Tipster', email: 'tipster@example.com', password: 'tipster123' },
        { role: 'Admin', email: 'admin@bettingbrain.com', password: 'admin123' },
        { role: 'Super Admin', email: 'superadmin@bettingbrain.com', password: 'superadmin123' },
    ];

    return (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-2 mb-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-2">Test Accounts Available</h3>
                    <div className="space-y-2 text-xs">
                        {accounts.map((account, index) => (
                            <div key={index} className="text-slate-300">
                                <span className="font-medium text-blue-300">{account.role}:</span>{' '}
                                <span className="text-slate-400">{account.email}</span> / {account.password}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
