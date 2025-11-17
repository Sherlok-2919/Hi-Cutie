import { motion } from 'framer-motion';

// NOTE:
// This component intentionally avoids importing `three`, `@react-three/fiber`,
// and `@react-three/drei` at build-time to prevent build errors when those
// packages are not installed. To enable the 3D cube, install the packages:
//
//   npm install three @react-three/fiber @react-three/drei
//
// and then replace this file with a runtime-loaded 3D implementation or
// re-add a component that statically imports from those packages.

export default function PhotoCube3D() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            3D Memory Cube (disabled)
          </h2>
          <p className="text-lg text-gray-600">
            The 3D cube feature is not enabled because the required packages are
            not installed in this environment.
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/40 p-12">
          <div className="max-w-lg mx-auto text-center">
            <p className="mb-4 text-gray-700">
              To enable the interactive 3D photo cube, run the following in your
              project root and restart the dev server:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-left text-sm overflow-auto">npm install three @react-three/fiber @react-three/drei</pre>
            <p className="mt-4 text-gray-700">
              After installing, add six photos to <code>/public/photos/</code>
              named <code>cube1.jpg</code> to <code>cube6.jpg</code> and re-enable
              the component implementation.
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-gray-500 text-sm"
        >
          Quick hint: the 3D cube is optional — the rest of the site works without it.
        </motion.p>
      </div>
    </section>
  );
}
