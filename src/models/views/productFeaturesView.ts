
export interface FeatureView {
  id: number;
  title: string;
  order_number: string;
  category_id: string;
  values: FeaturesValueView[];
}

export interface FeaturesValueView {
  id: number;
  feature_id: string;
  feature_title: string;
  value: string;
  order: string;
  state: string;
}
