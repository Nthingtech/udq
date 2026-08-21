package data;

import io.quarkiverse.roq.data.runtime.annotations.DataMapping;

import java.util.List;

@DataMapping(value = "features", type = DataMapping.Type.ARRAY_FILE)
public record Features(List<Feature> list) {

    public record Feature(String text) {}
}
