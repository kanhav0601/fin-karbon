import datetime

class FLAGS:
    GREEN = 1
    AMBER = 2
    RED = 0
    MEDIUM_RISK = 3  # display purpose only
    WHITE = 4  # data is missing for this field

def latest_financial_index(data: dict):
    """
    Determine the index of the latest standalone financial entry in the data.

    Parameters:
    - data (dict): A dictionary containing a list of financial entries under the "financials" key.

    Returns:
    - int: The index of the latest standalone financial entry or 0 if not found.
    """
    for index, financial in enumerate(data.get("financials", [])):
        if financial.get("nature") == "STANDALONE":
            return index
    return 0

def total_revenue(data: dict, financial_index: int):
    """
    Calculate the total revenue from the financial data at the given index.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for calculation.

    Returns:
    - float: The net revenue value from the financial data.
    """
    financials = data.get("financials", [])
    if financial_index >= len(financials):
        return 0.0
    
    pnl = financials[financial_index].get("pnl", {})
    return pnl.get("netRevenue", 0.0)

def total_borrowing(data: dict, financial_index: int):
    """
    Calculate the ratio of total borrowings to total revenue for the financial data at the given index.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for calculation.

    Returns:
    - float: The ratio of total borrowings to total revenue.
    """
    financials = data.get("financials", [])
    if financial_index >= len(financials):
        return 0.0
    
    borrowings = financials[financial_index].get("bs", {})
    short_term = borrowings.get("shortTermBorrowings", 0.0)
    long_term = borrowings.get("longTermBorrowings", 0.0)
    total_revenue_value = total_revenue(data, financial_index)
    
    if total_revenue_value == 0:  # Avoid division by zero
        return 0.0
    
    return (short_term + long_term) / total_revenue_value

def iscr_flag(data: dict, financial_index: int):
    """
    Determine the flag color based on the Interest Service Coverage Ratio (ISCR) value.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for the ISCR calculation.

    Returns:
    - FLAGS.GREEN or FLAGS.RED: The flag color based on the ISCR value.
    """
    if iscr(data, financial_index) >= 2:
        return FLAGS.GREEN
    else:
        return FLAGS.RED

def total_revenue_5cr_flag(data: dict, financial_index: int):
    """
    Determine the flag color based on whether the total revenue exceeds 5 crores.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for the revenue calculation.

    Returns:
    - FLAGS.GREEN or FLAGS.RED: The flag color based on the total revenue.
    """
    if total_revenue(data, financial_index) >= 50000000:  # 50 million
        return FLAGS.GREEN
    else:
        return FLAGS.RED

def iscr(data: dict, financial_index: int):
    """
    Calculate the Interest Service Coverage Ratio (ISCR) for the financial data at the given index.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for the ISCR calculation.

    Returns:
    - float: The ISCR value.
    """
    financials = data.get("financials", [])
    if financial_index >= len(financials):
        return 0.0
    
    pnl = financials[financial_index].get("pnl", {})
    interest_expenses = pnl.get("interestExpenses", 0.0)
    
    profit_before_interest_and_tax = pnl.get("profitBeforeInterestAndTax", 0.0)
    depreciation = pnl.get("depreciation", 0.0)

    if interest_expenses == 0:  # Avoid division by zero
        return 0.0

    return (profit_before_interest_and_tax + depreciation + 1) / (interest_expenses + 1)

def borrowing_to_revenue_flag(data: dict, financial_index: int):
    """
    Determine the flag color based on the ratio of total borrowings to total revenue.

    Parameters:
    - data (dict): A dictionary containing financial data.
    - financial_index (int): The index of the financial entry to be used for the ratio calculation.

    Returns:
    - FLAGS.GREEN or FLAGS.AMBER: The flag color based on the borrowing to revenue ratio.
    """
    ratio = total_borrowing(data, financial_index)
    if ratio <= 0.25:
        return FLAGS.GREEN
    else:
        return FLAGS.AMBER
