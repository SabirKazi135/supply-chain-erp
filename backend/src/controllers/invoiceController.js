const Invoice = require("../models/Invoice");

const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInvoices = async (req, res) => {
  try {
    const { companyId } = req.query;

    const invoices = await Invoice.find({
      userId: req.user.id,
      companyId,
    }).sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    res.json({
      message: "Invoice deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  deleteInvoice,
};
