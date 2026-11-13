"""
Machine Learning & OCR Module: Medicine Identification & Fuzzy Matching
Matches noisy medicine package text or barcode descriptions against verified medicine inventory.
"""
import difflib
from typing import List, Dict, Optional, Tuple

class MedicineMatcherML:
    @staticmethod
    def match_medicine(query: str, medicine_list: List[Dict]) -> Tuple[Optional[Dict], float, str]:
        """
        Fuzzy matches extracted text from packaging against medicine brand and generic names.
        Returns: (matched_medicine, confidence_score, status)
        """
        if not query or not query.strip():
            return None, 0.0, "Empty query text"

        query_cleaned = query.strip().lower()
        best_match = None
        highest_score = 0.0

        for med in medicine_list:
            brand = med.brand_name.lower()
            generic = med.generic_name.lower()

            # Direct substring match
            if brand in query_cleaned or query_cleaned in brand:
                return med, 0.98, "High Confidence Exact/Substring Match"
            if generic in query_cleaned or query_cleaned in generic:
                return med, 0.94, "High Confidence Generic Match"

            # Fuzzy sequence similarity
            score_brand = difflib.SequenceMatcher(None, query_cleaned, brand).ratio()
            score_generic = difflib.SequenceMatcher(None, query_cleaned, generic).ratio()
            max_score = max(score_brand, score_generic)

            if max_score > highest_score:
                highest_score = max_score
                best_match = med

        if highest_score >= 0.70:
            return best_match, round(highest_score, 2), "Confident Fuzzy Match"
        elif highest_score >= 0.50:
            return best_match, round(highest_score, 2), "Low Confidence Match (Verification Recommended)"
        else:
            return None, round(highest_score, 2), "Unidentified Medicine"

