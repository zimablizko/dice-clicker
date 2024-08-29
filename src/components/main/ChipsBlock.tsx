import { CalculationResult } from '../../common/model/calculation.model.js';

type ChipsBlockProps = {
  result: CalculationResult | undefined;
};

export default function ChipsBlock({ result: res }: ChipsBlockProps) {
  return (
    <div className="row">
      <div className="combo">
        <label>
          {res && res.comboProperties.name && <>{res.comboProperties.name}</>}
        </label>
      </div>
      <div className="calculation">
        <label>
          {res && res.baseValue !== 0 && (
            <>
              {res.baseValue === res.result && res.result}
              {res.baseValue !== res.result && (
                <>
                  {res.baseValue}
                  {res.upgradeMultiplier > 1 && ` x ${res.upgradeMultiplier}`}
                  {res.comboProperties.multiplier > 1 &&
                    ` x ${res.comboProperties.multiplier}`}
                  {` = ${res.result}`}
                </>
              )}
            </>
          )}
        </label>
      </div>
    </div>
  );
}
