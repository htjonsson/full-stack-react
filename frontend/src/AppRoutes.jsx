import { Routes, Route } from "react-router-dom";
// Finance Business Entity
import BusinessEntity from './modules/finance-business-entity/components/business-entity/business-entity';
import ProductGroup from './modules/finance-business-entity/components/product-group/product-group';
import PaymentGateway from './modules/finance-business-entity/components/payment-gateway/payment-gateway';
import BankAccount from './modules/finance-business-entity/components/bank-account/bank-account';

function AppRoutes () {  
    return (
        <Routes>
            <Route path="/business-entity" element={<BusinessEntity/>} />
            <Route path="/product-group/:id" element={<ProductGroup/>} />
            <Route path="/bank-account/:id" element={<BankAccount/>} />
            <Route path="/payment-gateway/:id" element={<PaymentGateway/>} />
        </Routes>
    )
}

export default AppRoutes;