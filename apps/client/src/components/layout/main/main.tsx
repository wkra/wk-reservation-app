import DesksList from '../../desks-list/desks-list';
import Hero from '../../hero/hero'

export default function Main() {
  return (
    <div className="container mx-auto">
      <Hero/>
      <DesksList/>
    </div>
  );
}
