import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {

      const testCases = [
        { amount: 100, result: 'PLN 100.00 = $28.57' },
        { amount: 20, result: 'PLN 20.00 = $5.71'  },
        { amount: 200, result: 'PLN 200.00 = $57.14' },
        { amount: 345, result: 'PLN 345.00 = $98.57' },
      ];

      for(const testObj of testCases) {

      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

      const resultDiv = screen.getByTestId('result-div');
      expect(resultDiv).toHaveTextContent(testObj.result);

      cleanup();
      }
    });
    it('should render proper info about conversion when USD -> PLN', () => {

      const testCases = [
        { amount: 100, result: '$100.00 = PLN 350.00' },
        { amount: 20, result: '$20.00 = PLN 70.00'  },
        { amount: 200, result: '$200.00 = PLN 700.00' },
        { amount: 345, result: '$345.00 = PLN 1,207.50' },
      ];

      for(const testObj of testCases) {

      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

      const resultDiv = screen.getByTestId('result-div');
      expect(resultDiv).toHaveTextContent(testObj.result);

      cleanup();
      }
    });
    it('should render proper info about conversion when from and to are the same', () => {

      const testCases = [
        { amount: 100, selected: 'USD', result: '$100.00 = $100.00' },
        { amount: 20, selected: 'USD', result: '$20.00 = $20.00'  },
        { amount: 200, selected: 'PLN', result: 'PLN 200.00 = PLN 200.00' },
        { amount: 345, selected: 'PLN', result: 'PLN 345.00 = PLN 345.00' },
      ];

      for(const testObj of testCases) {

      render(<ResultBox from={testObj.selected} to={testObj.selected} amount={testObj.amount} />);

      const resultDiv = screen.getByTestId('result-div');
      expect(resultDiv).toHaveTextContent(testObj.result);

      cleanup();
      }
    });
    it('should render "Wrong value..." when value below zero', () => {

      const testCases = [
        { amount: -100, from: 'USD', to: 'PLN' },
        { amount: -20, from: 'USD', to: 'PLN' },
        { amount: -200, from: 'PLN', to: 'USD' },
        { amount: -345, from: 'PLN', to: 'USD' },
      ];

      for(const testObj of testCases) {

      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

      const resultDiv = screen.getByTestId('result-div');
      expect(resultDiv).toHaveTextContent("Wrong value...");

      cleanup();
      }
    });
});