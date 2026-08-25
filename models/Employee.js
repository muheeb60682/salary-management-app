const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    personnelNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    fatherName: { type: String },
    cnic: { type: String, required: true },
    dateOfBirth: { type: String },
    entryDate: { type: String },
    designation: { type: String },
    bps: { type: Number },
    payStage: { type: Number },
    ddoCode: { type: String },
    gpfAccNo: { type: String },
    gpfBalance: { type: Number, default: 0 },
    basicPay: { type: Number, default: 0 },
    houseRent: { type: Number, default: 0 },
    conveyance: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    computerAllowance: { type: Number, default: 0 },
    electionAllowance: { type: Number, default: 0 },
    adhocRelief: { type: Number, default: 0 },
    gpfDeduction: { type: Number, default: 0 },
    benevolentFund: { type: Number, default: 0 },
    incomeTax: { type: Number, default: 0 },
    grossPay: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    netPay: { type: Number, default: 0 },
    accountNumber: { type: String },
    bankDetails: { type: String },
    email: { type: String },
    address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);